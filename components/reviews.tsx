import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Paragraph, useTheme } from 'react-native-paper';
import { User, Star } from "iconsax-react-native"
import Colors from '../assets/Colors';

interface ReviewItemProps {
  review: {
    author_details: {
      username: string;
      rating: number;
    };
    content: string;
  };
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { colors } = useTheme();

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card style={styles.reviewItem}>
      <Card.Title
        title={`${review.author_details.username} (${review.author_details.rating}/10)`}
        left={() => <User size={24} color={Colors.primary} />}
        titleStyle={styles.author}
      />
      <Card.Content>
        <Text
          numberOfLines={isExpanded ? undefined : 3}
          style={[styles.content, { color: Colors.secondry }]}
        >
          {review.content}
        </Text>
        {review.content.split(' ').length > 50 && (
          <TouchableOpacity onPress={toggleExpanded} style={styles.button}>
            <Text style={{ color: colors.primary }}>
              {isExpanded ? 'Show Less' : 'Show More'}
            </Text>
          </TouchableOpacity>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  reviewItem: {
    marginVertical: 4,
    marginHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  author: {
    fontWeight: 'bold',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    marginTop: 5,
    fontSize: 16,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  }
});

export default ReviewItem;
